import os
import sys
from transformers import BertModel, BertTokenizer
import torch
import numpy as np

import flask
from flask import Flask
from flask_cors import CORS

# create Flask app
app = Flask(__name__)
CORS(app)

# global variables -> used for all routes
model_type = 'bert-base-cased'
tokenizer = BertTokenizer.from_pretrained(model_type)
model = BertModel.from_pretrained(model_type, output_hidden_states=True)
model.eval()

'''
Tokenize a given sentence: break it up into word pieces as appropriate
'''
def tokenize_sentence(sentence):
    tokenized_sentence = tokenizer.tokenize(sentence)
    proper_tokens = sentence.split()

    word_map = []
    tdx=0
    for wdx,word in enumerate(proper_tokens):
        if word==tokenized_sentence[tdx] or tokenized_sentence[tdx]=='[UNK]':
            word_map.append([tdx])
        else:
            decoded_word = tokenized_sentence[tdx]
            piece_inds = [tdx]
            is_wordpiece = False
            while True:
                tdx+=1
                piece_inds.append(tdx)
                subpiece = tokenized_sentence[tdx]
                if len(subpiece) > 2 and subpiece[:2]=='##':
                    decoded_word += subpiece[2:]
                    is_wordpiece = True
                else:
                    decoded_word += subpiece
                if word==decoded_word:
                    if is_wordpiece:
                        word_map.append(piece_inds)
                    else:
                        for piece in piece_inds:
                            word_map.append([piece])
                    break
                #
            #
        #
        tdx+=1
    #

    return tokenized_sentence,word_map
#

'''
Compute the contextualized embedding, at a given layer, for a given tokenized sentence (and broken-down word pieces)
'''
def compute_contextualized_embedding(tokenized_sentence,word_map,layer):
    input_ids = torch.tensor(tokenizer.encode(tokenized_sentence, add_special_tokens=True)).unsqueeze(0)
    with torch.no_grad():
        outputs = model(input_ids)[2][layer].squeeze()

    raw_outs = outputs.numpy()[1:-1]
    mapped_out = np.zeros((len(word_map),raw_outs.shape[1]),dtype=np.float32)
    reconstituted_tokens = []
    for pdx,piece_inds in enumerate(word_map):
        mapped_out[pdx] = raw_outs[piece_inds[-1]]
        reconstructed_word = ''
        for piece in piece_inds:
            token = tokenized_sentence[piece]
            if len(token) > 2 and token[:2]=='##':
                reconstructed_word += token[2:]
            else:
                reconstructed_word += token
            #
        #
        reconstituted_tokens.append(reconstructed_word)
    #
    return mapped_out,reconstituted_tokens
#

@app.route('/grab_sentence_embedding', methods=['GET','POST'])
def grab_sentence_embedding():
    # contains the `data` passed by the client
    client_data = flask.request.json

    sentence = client_data['sentence']
    layer = client_data['layer']

    # compute contextualized embedding, reconstituted tokens -> might be different from original sentence
    tokenized_sentence,word_map = tokenize_sentence(sentence)
    contextualized_embedding,reconstituted_tokens = compute_contextualized_embedding(tokenized_sentence,word_map,layer)

    # here we will prepare our data for the client: create an array of data where each item has: token, and value of neuron for that word
    all_data = []
    for tdx in np.arange(contextualized_embedding.shape[0]):
        for ndx in np.arange(contextualized_embedding.shape[1]):
            # IMPORTANT: explicit type casting, since ints and floats from numpy cannot be sent back to the server!
            all_data.append({'token':reconstituted_tokens[tdx],'neuron':int(ndx),'value':float(contextualized_embedding[tdx,ndx])})
        #
    #

    # return to server -> contextualized embeddings, as well as tokenized sentence
    return flask.jsonify({'embedding':all_data,'reconstituted_tokens':reconstituted_tokens})
#

if __name__=='__main__':
    # run the server!
    app.run()
