export type TAppHeaderLink = {
  to: string;
  isActive: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

export type TAppHeaderUIProps = {
  userName?: string;
  constructorLink?: TAppHeaderLink;
  feedLink?: TAppHeaderLink;
  profileLink?: TAppHeaderLink;
  logoLink?: TAppHeaderLink;
};
