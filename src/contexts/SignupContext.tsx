import React, { createContext, useContext, useState } from 'react';

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  homeGym: string;
  gradeStyle: string;
  passwordValid: boolean;
};

type SignupContextType = {
  form: SignupFormData;
  // eslint-disable-next-line no-unused-vars
  updateForm: (updates: Partial<SignupFormData>) => void;
  resetForm: () => void;
};

const SignupContext = createContext<SignupContextType | undefined>(undefined);

const initialFormState: SignupFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  homeGym: '',
  gradeStyle: '',
  passwordValid: false,
};

export const SignupProvider = ({ children }: { children: React.ReactNode }) => {
  const [form, setForm] = useState<SignupFormData>(initialFormState);

  const updateForm = (updates: Partial<SignupFormData>) => {
    setForm(prev => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setForm(initialFormState);
  };

  return (
    <SignupContext.Provider value={{ form, updateForm, resetForm }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) throw new Error('useSignup must be used within a SignupProvider');
  return context;
};
