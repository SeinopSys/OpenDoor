class ValidationErrors {
  constructor(errors = {}){
    this._errors = errors;
  }

  has(key){
    return this._errors[key] !== undefined;
  }

  get(key){
    return this._errors[key];
  }
}

export default ValidationErrors;
