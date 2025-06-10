export interface TaskExecution {
  startTime: string;
  endTime: string;
  output: string;
}

export interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions: TaskExecution[];
}

export const mockTasks: Task[] = [
  {
    id: "1",
    name: "Print Hello",
    owner: "John Smith",
    command: "echo Hello World!",
    taskExecutions: [
      {
        startTime: "2024-03-21 15:51:42.276Z",
        endTime: "2024-03-21 15:51:43.276Z",
        output: "Hello World!"
      }
    ]
  },
  {
    id: "2",
    name: "List Directory",
    owner: "Jane Doe",
    command: "ls -la",
    taskExecutions: [
      {
        startTime: "2024-03-21 16:00:00.000Z",
        endTime: "2024-03-21 16:00:01.000Z",
        output: "total 32\ndrwxr-xr-x 2 user group 4096 Mar 21 15:51 .\ndrwxr-xr-x 4 user group 4096 Mar 21 15:51 .."
      }
    ]
  },
  {
    id: "3",
    name: "Check System Info",
    owner: "Bob Johnson",
    command: "uname -a",
    taskExecutions: [
      {
        startTime: "2024-03-21 16:30:00.000Z",
        endTime: "2024-03-21 16:30:01.000Z",
        output: "Linux server 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 GNU/Linux"
      }
    ]
  }
]; 