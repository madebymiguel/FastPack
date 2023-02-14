export interface Error {
  driver: boolean;
  name: string;
  index: number;
  code: number;
  keypattern: { email: number };
  keyValue: { email: string };
}
