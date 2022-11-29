function handleSubmit(event,cirDetails) {
    event.preventDefault();
  
    const data = new FormData(event.target);
  
    const value = Object.fromEntries(data.entries());
  
    value.topics = data.getAll("topics");
  
    console.log({ value });
  
  }
  