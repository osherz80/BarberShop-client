const api = require('./axiosInstance').default;

const requests = {
  user: {
    getAllCustomers: () => api.get('/person/all'),
    getCurrentUser: () => api.get('/person/self'),
    logIn: (email, phoneNum) => api.post('/person/login', {
      email, phoneNum
    }),
    getLoginTokin: (personId) => api.post('/person/login-token', { personId }),
  },
  register: {
    getSmsCode: (phoneNum) => api.post('/sms/code', {
      phoneNum,
    }),
    authSmsCode: (phoneNum, code) => api.post('/sms/auth', {
      phoneNum, code,
    }),
    addPerson: (personInfo) => api.post('/person/register', personInfo),
  },
  treatment: {
    getAllTreatments: () => api.get('/treatment/all'),
  },
  appointment: {
    getAllAppointments: () => api.get('/appointment/all'),
    getPersonAppointmentsByToken: () => api.get('/appointment/by/token'),
    getAppointmentsByDate: (date) => api.post('/appointment/by/date', { date }),
    getAppointmentsInRange: (from, to) => api.post('/appointment/in/range', { from, to }),
    getAppointmentsTimeDTOsByDate: (date) => api.post('/appointment/time/by/date', { date }),
    addAppointment: (treatmentId, date) => api.post('appointment/add', { treatmentId, date }),
    cancelAppointment: (appointmentId) => api.delete(`appointment/delete/${appointmentId}`),
  },
};

export default requests;
