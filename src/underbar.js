(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var lastEl = array.length - 1;
    return (n === undefined) ? array[lastEl] : 
                                              (n === 0) ? [] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++){
        iterator(collection[i], i, collection);
      }
    } else {
      for (var el in collection){
        iterator(collection[el], el, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var returnArray = [];

    for(var i = 0; i < collection.length; i++){
        if (test(collection[i])) {
          returnArray.push(collection[i]);
        }
    }

    return returnArray;

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(el){
      return !test(el);
    });
    
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniqArray = [array[0]],
        arrayLength = array.length; //initialize 
    
    if (arrayLength > 1){
      for (var i = 1; i < arrayLength; i++){
        //check if duplicate
        var isDupl = false;
        for (var j = 0; j < uniqArray.length; j++){
          if (array[i] === uniqArray[j]) {
            isDupl = true;
            break;
          }
        }
        //push if false
        if (isDupl === false){
          uniqArray.push(array[i]);
        }
      }
    }

    return uniqArray;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapArray = [];
    for (var i = 0, collecLength = collection.length; i < collecLength; i++){
      mapArray.push(iterator(collection[i]));
    }

    return mapArray;

  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  
  _.reduce = function(collection, iterator, accumulator) {
    //isArray
    if (Array.isArray(collection)){
     //first case
      if (arguments.length < 3) { 
        var accumulator = collection[0];
      } else {
        accumulator = iterator(accumulator, collection[0]);
      }

      for (var i = 1, collecLength = collection.length; i < collecLength; i++){
        accumulator = iterator(accumulator, collection[i]);
      } 
    } else {
    //isObject
      var index = 0;
      for (var el in collection){
        if (index === 0){

          var accumulator = (arguments.length < 3) ? collection[el] : iterator(arguments[2], collection[el]);
          index++;
          continue;
        }
        accumulator = iterator(accumulator, collection[el]);
      }
    }
 

    return accumulator;
  
  /*
  This bottom version fails to take account for the case for an array where we only want to iterate over numeric properties. The for-in loop
  iterates over both numeric and non-numeric properties.

    var index = 0;
      for (var el in collection){
                console.log(collection[el]);
        if (index === 0){

          var accumulator = (arguments.length < 3) ? collection[el] : iterator(arguments[2], collection[el]);
          index++;
          console.log(accumulator);
          continue;
        }
        accumulator = iterator(accumulator, collection[el]);
      }
  return accumulator;
*/
};
  

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    var numArg = arguments.length; //used for no-callback case

    return _.reduce(collection, function(isTrue, item){
      if (!isTrue) return false;
      
      //case: no callback
      if (numArg < 2){
        iterator = _.identity;
      }

      //case: empty collection [] and {}
      if (JSON.stringify(collection) === "[]" || JSON.stringify(collection) === "{}"){
        return true;
      }

      return !!iterator(item);  //use !! to accomodate for no-callback case. 
    }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    //no-callback case:
    if (arguments.length<2){
      iterator = _.identity;
    };

    return !_.every(collection, function(item){
      return !iterator(item)
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var numArg = arguments.length,
        ExtendedObj = obj;

    for(var i = 1; i < numArg; i++){
      for (var j in arguments[i]){
       ExtendedObj[j] = arguments[i][j];          
      }
    }
    return ExtendedObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var numArg = arguments.length,
        ExtendedObj = obj;

    for(var i = 1; i < numArg; i++){
      for (var j in arguments[i]){
       if(ExtendedObj[j] === undefined){
        ExtendedObj[j] = arguments[i][j];           
       }
      }
    }
    return ExtendedObj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //history variables stored in closure scope.
    var argHist = [], resultHist = [];

    return function(){
      var arg = arguments[0], 
          argIndex = _.indexOf(argHist, arg),
          result;

      if(argIndex !== -1){
        return resultHist[argIndex];
      } 
      //if the argument isn't found
      result = func.apply(this, arguments);
      //add to history variables.
      argHist.push(arg);
      resultHist.push(result);

      return result;
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms

   //using setTimeout()
  _.delay = function(func, wait) {

    var funcArg = [];
    
    for(var i = 2; i < arguments.length; i++){
      funcArg.push(arguments[i]);
    }

    setTimeout(function(){
        return func.apply(this, funcArg);
    }, wait);

  };
  
  
  /*
  //preliminary version I thought of that doesn't use setTimeout(). It apparently conflicts with the 
  //sinon.js plugin and doesn't work for the code test.
  _.delay = function(func, wait) {

    var startTime = Date.now().valueOf(),
        endTime = startTime + wait,
        currentTime = startTime,
        funcArg = [];

        //debug
        console.log(startTime);
        //console.log(endTime);
        console.log(currentTime);

    
    for(var i = 2; i < arguments.length; i++){
      funcArg.push(arguments[i]);
    }
    while (currentTime < endTime) { //keep this loop running until currentTime reaches endTime.
      currentTime = Date.now().valueOf();
      console.log(currentTime);
    }
 
    return func.apply(this, funcArg);
  };
  */
  
 

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  //note to self: look into how arrays are stored in memory.
  //Ex. var x = [1,2], y = [1,2]; isn't equivalent to var x = [1,2], y = x;
_.shuffle = function(array) {
  var origArray = array.slice(),
      dummyArray,
      shuffledArray,
      randIndex;

  var notShuffled = function(x,y){
    var yes = true;

    if(x.length !== y.length){
      yes = undefined; //returns undefined if arrays aren't same length.
    }
    else{
      for(var i = 0; i< x.length; x++){
        if(x[i] !== y[i]){
          yes = false;
        }
      }
    } 
    return yes;
  };

  do{ //repeats until it's shuffled.    
      dummyArray = origArray.slice(); 
      shuffledArray = [];

    for(var i = 0; i < origArray.length; i++){
      randIndex = Math.floor(Math.random() * dummyArray.length);
      shuffledArray.push(dummyArray[randIndex]);
      dummyArray.splice(randIndex,1);
    }
  } while(notShuffled(origArray, shuffledArray))

  return shuffledArray;
  };
  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    /*if(arguments.length < 2){
      //if no functionOrKey is passed
      _.identity(collection);
    } else{
      if 

    }
  */
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    /*
    if(Array.isArray(collection)){
      var sortedArray =[],
          valueArray = []; //array storing the return value of iterator.
      //case 1: iterator is a function
      if(typeof(iterator) === "function"){
        for(var i = 0; i < collection.length, i++){
          valueArray.push(iterator(collection[i]))
        }

      }
      //case 2: iterator is a string

    } else{
      console.log("_.sortBy() cannot sort non-array input");
    }
    */
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    //enforcing all inputs to be array.
    if(_.every(arguments, function(x){return Array.isArray(x);})){
        var zippedArray = [],
            maxLength = 0;
        //1st determine the max length of the input arrays.
        for(var i = 0; i < arguments.length; i++){
          maxLength = (arguments[i].length >= maxLength) ? arguments[i].length : maxLength;
        }
        //2nd populate zippedArray
        for(var j= 0; j < maxLength; j++){
          var jthArray = [];
          for(var i = 0; i < arguments.length; i++){
            jthArray.push(arguments[i][j]);
          }
          zippedArray.push(jthArray);
        }


        return zippedArray;        
    } else{
      console.log("_.zip() doesn't accept non-array arguments.")
    }

  
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    //KN: what to do with the 'result' input?

    //Make sure nestedArray is actually an array.
    if(!Array.isArray(nestedArray)){
      console.log('Error: input argument must be an array.');
      return undefined;
    }


    var flattenedArray = [],
        origArray = nestedArray.slice();

    //function pushFirst()
    //description: Array.shift() the first non-array element in origArray and Array.push() into flattenedArray. 
    //It uses a recursive technique to dig through all elements contained within a nested array.
    var pushFirst = function(flattenedArray, origArray){
      if(origArray.length > 0){
        var child = origArray.shift();
        if(!Array.isArray(child)){
          flattenedArray.push(child);
        } else{
          pushFirst(flattenedArray, child);
        }
        pushFirst(flattenedArray, origArray);
      }    
    };

    pushFirst(flattenedArray, origArray);
    return flattenedArray;


  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var numArrays = arguments.length,
        allChilds = [], //include repeats
        uniqChilds = [], //unique
        intersectionArray = []; //output array
    //function that loops through all arrays to see if element is contained.
    var containAll = function(item){
      var count = 0;
      for(var i = 0; i < allChilds.length; i++){
        if(allChilds[i] === item){
          count++;
        }
      }
      return (count >= numArrays) ? true : false; 
    };

    //Error handler to make sure all inputs are array.
    for(var i = 0; i < numArrays; i++){
      if(!Array.isArray(arguments[i])){
        console.log('the ' + i + "th argument isn't an array.");
        return undefined;
      }
      //construct allChilds
      allChilds = allChilds.concat(arguments[i]);
    }
    //construct uniqChilds using _.uniq()
    uniqChilds = _.uniq(allChilds);

    //push to intersectionArray if containAll(item) returns true.
    for(var i = 0; i < uniqChilds.length; i++){
      if(containAll(uniqChilds[i])){
        intersectionArray.push(uniqChilds[i]);
      }
    }
    return intersectionArray;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var numArrays = arguments.length,
        firstArray = array,
        restArray = [],
        differenceArray = [];
    //Error handler to make sure all inputs are array.
      if(!Array.isArray(array)){
      console.log("the first argument isn't an array.");
      return undefined;
      }

    for(var i = 1; i < numArrays; i++){
      if(!Array.isArray(arguments[i])){
        console.log('the ' + i + "th argument isn't an array.");
        return undefined;
      }
    //construct restArray
      restArray = restArray.concat(arguments[i]);
    }
    
    //construct the output array 'differenceArray'
    for(var i = 0; i < firstArray.length; i++){
      if(!_.contains(restArray, firstArray[i])){
        differenceArray.push(firstArray[i]);
      }
    }
    return differenceArray;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
