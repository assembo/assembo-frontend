import {
    DashboardOutlined,
    ViewAgendaOutlined,
  } from "@material-ui/icons";

import { Icon } from '@iconify/react';
import CreateAMeeting from "../../CreateAMeeting";
import FastMeeting from "../../FastMeeting";
import MeetingLibrary from "../../MeetingLibrary";
  
export const SidebarLinks = [
  {
    icon: <Icon icon="mdi:rocket" style={{ fontSize: 30, marginBottom: 30 }} />,
    path: "/fast",
    component: FastMeeting,
  },
  {
    icon: <DashboardOutlined style={{ fontSize: 30, marginBottom: 30 }} />,
    path: "/library",
    component: MeetingLibrary,
  },
  {
    icon: <ViewAgendaOutlined style={{ fontSize: 30, marginBottom: 30 }} />,
    path: "/meetingCenter",
    component: CreateAMeeting,
  },
];
  