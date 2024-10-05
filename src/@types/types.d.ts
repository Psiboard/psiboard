type Schedule = {
  id: string;
  date: any;
  hour: string;
  type: string;
  user_id: string;
  patient_id: string;
};

type CardProps = {
  scheduleId: string;
  patientId: string;
  hour: string;
  date: any;
};

type ModalProps = {
  scheduleId: string;
  patientId: string;
  hour: string;
  name: string;
  date: any;
  phone: string;
  isOpen: boolean;
  onClose: () => void;
};

type Patients = {
  id:string;
  name: string;
  age: number;
  email: string;
  phone: string;
  street: string;
  district: string;
  city: string;
  state: string;
  zip_code: string;
  additional_info: string;
  user_id: string | undefined;
};

type BodyScheduleMutation = {
  date: any;
  hour: string;
  type: string;
  patient_id: string;
  user_id: string | undefined;
};

type Profesisonal = {
  email: string;
  name: string;
  password: string;
  contact: string;
  role: string;
};

type User = {
  nome: string;
  email: string;
  id: string;
};
