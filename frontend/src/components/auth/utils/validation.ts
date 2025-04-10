
export function validateRegistration(form: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  if (!form.name || !form.email || !form.password) {
    return "Please fill in all fields";
  }
  
  if (form.password !== form.confirmPassword) {
    return "Passwords do not match";
  }
  
  if (form.password.length < 6) {
    return "Password must be at least 6 characters";
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    return "Please enter a valid email address";
  }
  
  return null;
}
