type Schedule = {
  date: string;
  hour: string;
  id: string;
  patient: {
    adress: string;
    age: number;
    email: string;
    id: string;
    info_add: string;
    name: string;
    phone: string;
    zip_code: string;
  };
  type: string;
};

type CardProps = {
  scheduleId: string;
  patientId: string;
  hour: string;
  name: string;
  date: string;
  phone: string;
};

type ModalProps = {
  scheduleId: string;
  patientId: string;
  hour: string;
  name: string;
  date: string;
  phone: string;
  isOpen: boolean;
  onClose: () => void;
};

type Patients = {
  adress: string;
  age: number | string;
  email: string;
  id: string;
  info_add: string;
  name: string;
  phone: string;
  zip_code: string;
};

type BodyPatientMutation = Patients & {
  professional: string | undefined;
};

type BodyScheduleMutation = {
  date: string;
  hour: string;
  patient: string;
  professional: string | undefined;
};

type Profesisonal = {
  email: string;
  name: string;
  password: string;
};

type User = {
  nome: string;
  email: string;
  id: string;
};
