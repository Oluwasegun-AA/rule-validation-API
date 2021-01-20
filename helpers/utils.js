const log = string => {
  process.stdout.write(`${string}\n`);
};

const connectionMessage = port => {
  log(`Server started on port ${port}`);
};

export {
  log,
  connectionMessage,
};
