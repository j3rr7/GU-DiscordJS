export default abstract class BaseCommand {
  name: string;
  description: string;
  execute: (...args: any) => Promise<void> | void;

  constructor(object: {
    name: string;
    description: string;
    execute: (...args: any) => Promise<void> | void;
  }) {
    this.name = object.name;
    this.description = object.description;
    this.execute = object.execute;
  }

  setName(name: string): void {
    this.name = name;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setExecute(executeFunction: (...args: any) => Promise<void> | void): void {
    this.execute = executeFunction;
  }
}
