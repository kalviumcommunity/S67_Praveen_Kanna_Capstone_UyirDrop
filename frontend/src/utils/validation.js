export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validatePhone = (phone) => {
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const validateBloodType = (bloodType) => {
  const validTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  return validTypes.includes(bloodType);
};

export const validateAge = (age) => {
  const numAge = Number(age);
  return numAge >= 18 && numAge <= 65;
};

export const validateAddress = (address) => {
  return address && address.trim().length >= 10;
};

export const getValidationError = (field, value) => {
  switch (field) {
    case 'email':
      return !validateEmail(value) ? 'Please enter a valid email address' : '';
    case 'phone':
      return !validatePhone(value) ? 'Please enter a valid 10-digit phone number' : '';
    case 'password':
      return !validatePassword(value) ? 'Password must be at least 6 characters long' : '';
    case 'name':
      return !validateName(value) ? 'Name must be at least 2 characters long' : '';
    case 'bloodType':
      return !validateBloodType(value) ? 'Please select a valid blood type' : '';
    case 'age':
      return !validateAge(value) ? 'Age must be between 18 and 65' : '';
    case 'address':
      return !validateAddress(value) ? 'Please enter a complete address' : '';
    default:
      return '';
  }
};