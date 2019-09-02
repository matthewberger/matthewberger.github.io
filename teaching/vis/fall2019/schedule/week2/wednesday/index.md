---
layout: default
title: Wednesday Lecture
---

# Javascript: Functions

We will begin to cover D3 next week, and critical to understanding D3 is how functions work in Javascript. There are a number of nuances to functions that are necessary to review.

## Declarations and Expressions

Take a look at the following two function definitions for computing the length of a 2D vector:

```javascript
function length(x,y)  {
	return Math.sqrt(x*x+y*y);
}
```

```javascript
function(x,y)  {
	return Math.sqrt(x*x+y*y);
}
```

Can you spot the difference?

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>

Indeed there is: the former is what is known as a **function definition** and the latter a **function expression**. A function definition is probably what you are most familiar with in other programming languages. We declare it, and once declared, we can access it by name. However, how can we access the function expression? It has no name! What to do?

A function defined by an expression is **anonymous**: it has no name. What we can do, however, is assign the function to a variable:

```javascript
var my_length = function(x,y)  {
	return Math.sqrt(x*x+y*y);
}
```

By assigning `my_length` to the function, note that the function is **not executed**. We can only execute functions with `()`. Thus, you can view `my_length` as carrying around the anonymous function. We can invoke this function by treating `my_length` as any other function:

```javascript
var my_x = 4, my_y = 5;
my_length(my_x,my_y)
```

Importantly, in Javascript, _functions are objects_. Therefore, we can assign a function to a variable, like any other object.

## Example: Built-in Javascript functions

The ability to assign a function to a variable is quite powerful, and is heavily used in Javascript (and D3!). Let us consider some examples. We will look at methods associated with the Array object in Javascript: sorting, mapping, and filtering.


### sort

Let's suppose we define the following Array of objects:

```javascript
var arr = [1,3,2,5,6];
```

The method `sort` is a built-in function of an Array object - it defaults to sorting **strings** (whether the data are strings or not). You may call it directly on `arr` to sort the list in ascending order:

```javascript
arr.sort() // [1,2,3,5,6]
```

Simple enough. Now let us suppose we have the following Array of objects:

```javascript
var arr = [ {'MPG':30,'Origin':'USA'}, {'MPG':25,'Origin':'Europe'}, {'MPG':45,'Origin':'Japan'} ];
```

Let's suppose we wanted to sort by `MPG`. We cannot simply call `sort` as before! We need to tell `sort` _how to compare 2 items_. Luckily, what we can do is pass a function to sort!

```javascript
function comparator(a,b)  {
   return a.MPG-b.MPG;
}
arr.sort(comparator) // [{'MPG':25,'Origin':'Europe'}, {'MPG':30,'Origin':'USA'}, {'MPG':45,'Origin':'Japan'}]
```

Under the hood, the function passed in to `sort` is assigned to a parameter. Note that `comparator`, however, is never explicitly called. Within `sort`, `comparator` will be invoked as necessary in order to properly sort the objects. The parameter in `sort` that is assigned the function is thus treated as an **expression**.

In the above, we actually treated a named function as an expression. We do not need to do this, however, and instead _directly_ pass in an anonymous function when we call sort:


```javascript
arr.sort(function(a,b)  {
   return a.MPG-b.MPG;
})
```

The same type of operation is performed here: the anonymous function is assigned to the parameter for this function.

### map

Let us continue with the `arr` array of car data as above. Suppose we wanted to multiply the MPG of each object by a factor of 2, and just return this result. We could always create a loop to perform this operation, but we can also use the built-in method `map`:

```javascript
var arr_2 = arr.map(function(d)  {
   return 2*d.MPG;
})
// returns [60,50,90]
```

Here, the `map` method accepts a function that will be used when iterating over each object, and then return an array that results from applying map to each object.

### filter

Let us consider one more example. Suppose for the `arr` array we would like to remove objects that have a MPG less than 28. We can use the built-in `filter` method for this purpose:

```javascript
var arr_3 = arr.filter(function(d)  {
   return d.MPG >= 28;
})
// returns [{'MPG':30,'Origin':'USA'}, {'MPG':45,'Origin':'Japan'}]
```

Here again, `filter` accepts a functions that will be used when iterating over each object, and invoked on each object to determine if it should be kept or not in the output array.

## Scope, Functions within Functions

Another important feature of Javascript is the ability to define functions inside of functions. Let's consider the following example:

```javascript
var x_base = 2;
function my_scale()  {
   function apply_identity_scale(x1)  {
      return x_base+x1;
   }
   return apply_identity_scale;
}
```

Question: can we directly call `apply_identity_scale` outside of `my_scale`?

No! It is not within **scope**. We can, however, call `my_scale`, which in turn, calls `apply_identity_scale`.

Scope refers to what variables/functions may be accessed. We say that `my_scale` is the parent function of `apply_identity_scale`. A given function has access to all variables/functions within its parent function, and all ancestors -- including the **global scope**, or the main entry point from which the code is ran. This is how `x_base` (global scope) is accessible from within `apply_identity_scale`.

## Closures

Now consider the following:

```javascript
function my_scale(x)  {
   function apply_shift_scale(x1)  {
      return x+x1;
   }
   return apply_shift_scale;
}

shift_scale_1 = my_scale(10);
shift_scale_2 = my_scale(20);
```

When we call function `my_scale`, it returns another function, but one that has not been executed. From here, we can call `shift_scale_1(10)` and `shift_scale_2(10)` and this will return 20 and 30, respectively. This might seem odd: what is happening to the variable `x`? You might think that after the first function call (e.g. `my_scale(10)`), `x` is destroyed. However, due to the presence of the **inner function**, all variables / functions within the scope of `my_scale` persist, and all of this information is _bound_ to the inner function. Hence, `shift_scale_1` and `shift_scale_2` have unique `x` values, that we do not have direct access to in the global scope.

This is known as a **closure**: a function that references, and retains, bindings from the local scope. It is useful to think of this in terms of the _environment_ in which the function is created, rather than the environment in which the function is called.

A powerful feature about closures, frequently employed in D3, is that we can associate functions with the returned inner function. Since _functions are objects_, we can assign a property to a function. Due to the closure, these properties have access to variables / functions in the outer scope as well:

```javascript
function my_scale(x)  {
   var domain = [0,1];

   var the_scale = function(x1)  {
      return x+x1;
   }

   the_scale.set_domain = function(d_min,d_max)  {
      domain[0] = d_min;
      domain[1] = d_max;
   }
   the_scale.update_x = function(new_x)  {
      x = new_x;
   }
   the_scale.print_domain = function()  {
      console.log(domain[0]+','+domain[1]);
   }

   return the_scale;
}

shift_scale = my_scale(10);
shift_scale.set_domain(0,10);
shift_scale.print_domain(); // prints 0,10
```

A couple notes:
* The function expression assigned to `the_scale` forms a closure, where `x` and `domain` are accessible to any functions within the scope of `my_scale`, _even after the call has completed_.
* `the_scale`, however, is _not_ accessible from outside of the scope of `my_scale`.
* Question: can we access `domain` at the global scope?

## The Arrow

An alternative syntax for defining an anonymous function is by using the **arrow**. Recall the sort example:

```javascript
arr.sort(function(a,b)  {
   return a.MPG-b.MPG;
})
```

We can rewrite this as the following:

```javascript
arr.sort((a,b) => {
   return a.MPG-b.MPG;
})
```

For single-line functions we can be even more succinct:

```javascript
arr.sort((a,b) => a.MPG-b.MPG)
```

Are there any differences between the arrow and the traditional function expression? **Yes.** But we will return to these differences later in the semester, when they become relevant.
