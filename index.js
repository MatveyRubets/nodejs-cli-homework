const { listContacts, removeContact, getContactById, addContact } = require('./contacts');

const { Command } = require('commander');

const program = new Command();

program
  .option('-a, --action <type>', 'Choose an action')
  .option('-i, --id <type>', 'Id')
  .option('-n, --name <type>', 'Name')
  .option('-e, --email <type>', 'Email')
  .option('-p, --phone <type>', 'Phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;
    case 'get':
      getContactById(id);
      break;
    case 'remove':
      removeContact(id);
      break;
    case 'add':
      addContact(name, email, phone);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
