export const contactMethods = [
  { value: 'email', label: 'Email' },
  { value: 'call', label: 'Call' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'text', label: 'Text' },
  { value: 'social-media', label: 'Social Media' },
  { value: 'e-meet', label: 'E-Meet' },
  { value: 'in-person', label: 'In-Person' },
  { value: 'other', label: 'Other' },
]

export const contactMethodsMap = contactMethods.reduce((acc, method) => {
  acc[method.value] = method.label;
  return acc;
}, {});

// Then you can access the label like this:
// const methodLabel = contactMethodsMap['email']; // Returns 'Email'
