export interface IUser {
  profile_id?: number;
  uid?: number;
  utorid?: string;
  last?: string;
  first?: string;
  name?: string;
  gender?: string;
  email?: string;
  branch?: string;
  about?: string;
  tag?: string;
  tags?: any[];
  areas?: IPArea[];
  views?: number;
  linkedin?: string;
  status?: number;
  created?: Date;
  modified?: Date;
  modified_str?: string;
  team?: ITeam;
  has_team?: boolean;
  project?: IProject;
  projects?: IProject[];
  uliked?: IUser[];
  tliked?: ITeam[];
  pliked?: any[];
  pcreated?: any[];
  s_str?: string;
  hahaid?: number;
  role?: any;
  s_name?: string;
  tid?: number;
  experiences?: any[];

}

export interface ITeam {
  pk?: number;
  tid?: number;
  oid?: number;
  hahaid?: number;
  owner?: string;
  mates?: any[];
  size?: number;
  name?: string;
  created?: Date;
  modified?: Date;
  modified_str?: string;
  about?: string;
  skills?: any[];
  status?: number;
  pref?: any[];
  views?: number;
  cloud?: string;
  email?: string;
  magictoken?: number;
  areas?: IPArea[];
  tag?: string;
  tags?: any[];
  project?: IProject[];
  related_areas?: any[];
  s_str?: string;
  s_name?: string;
}

export interface IProject {
  total?: number;
  pid?: number;
  oid?: number;
  owner?: string;
  owner_first_name?: string;
  owner_last_name?: string;
  hahaid?: number;
  owner_role?: string;
  teams?: ITeam[];
  size?: IOption[];
  name?: string;
  email?: string;
  created?: Date;
  created_str?: string;
  modified?: Date;
  modified_str?: string;
  magictoken?: number;
  abs?: string;
  about?: string;
  tag?: string;
  tags?: any[];
  areas?: IPArea[];
  status?: IOption[];
  pref?: any[];
  views?: number;
  liked_number?: number;
  liked_people?: IUser[];
  liked_people_name?: Likepeople[];
  liked_people_str?: string;
  //liked_people?: string;
  s_str?: string;
  s_name?: string;
  number_of_members?: number;
  comments?: any[];
  team_member_name?: string;
  team_member_number?: number;
  supervisor?: string;
  sid?: number;
  ownerid?: number;
  recommend_roject?: IProject[];
  whatever?: any;
  ownerprofile?: number;
  supprofile?: number;

}

export interface IExperience {
  company?: string;
  title?: string;
  date?: string;
}

export interface IAreas {

  'Photonics'?: boolean;
  'Semiconductor'?: boolean;
  'Electromagnetics'?: boolean;
  'Energy'?: boolean;
  'Analog'?: boolean;
  'Digital'?: boolean;
  'Control'?: boolean;
  'Communication'?: boolean;
  'Signal'?: boolean;
  'Hardware'?: boolean;
  'Software'?: boolean;
  'Network'?: boolean;

}

export interface IOption {
  label?: string;
  value?: boolean;
}

export interface IPArea {
  pk?: number;
  tag_name?: string;
  value?: boolean;
}

export interface Likepeople {
  name?: string;
  uid?: number;

}


export interface wocaoid {
  user?: number;
  profile?: number;
  team?: number;
  project?: number;
}


export interface profileForm {
  user_id?: number,
  related_areas?: any[],
  utorid?: string,
  gender?: string,
  branch?: string,
  about?: string,
  views?: number,
  linkedin?: string,
  status?: number,
  experience?: any[],
}

export interface userForm {
  pk?: number;
  first_name?: string;
  last_name?: string;
}
