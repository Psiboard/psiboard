import { Route, Routes } from "react-router-dom";
import {Dashboard,Login,Patients,PatientsList,Register,Schedules, Onboarding} from "../pages";
import ProtectedRoute from "./protected-route";
import DashboardLayout from "../layouts/dashboard-layout";

export function RouteApp () {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/*" element={<ProtectedRoute/>}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="schedules" element={<Schedules />} />
          <Route path="patients" element={<Patients />} />
          <Route path="patients-list" element={<PatientsList />} />
        </Route>
      </Route>
    </Routes>
  );
}