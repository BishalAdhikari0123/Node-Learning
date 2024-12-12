const promise = new Promise((resolve, reject) => {
    // Simulate an asynchronous operation
    const success = true;
  
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed.");
    }
  });
  