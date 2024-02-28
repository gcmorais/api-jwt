const UserRepository = require('../repositories/UserRepository');

class UserController {
  async index(request, response) {
    const users = await UserRepository.findAll();

    response.json(users);
  }

  async store(request, response) {
    const { name, email, password } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is Required' });
    }
    if (!email) {
      return response.status(400).json({ error: 'email is Required' });
    }
    if (!password) {
      return response.status(400).json({ error: 'password is Required' });
    }

    const emailExists = await UserRepository.findByEmail(email);

    if (emailExists) {
      return response.status(400).json({ error: 'This email already exists!' });
    }

    const contact = await UserRepository.create({ name, email, password });
    response.json(contact);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await UserRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found ' });
    }

    response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, password,
    } = request.body;

    const userExists = await UserRepository.findById(id);
    if (!userExists) {
      return response.status(404).json({ error: 'User not found' });
    }
    if (!name) {
      return response.status(400).json({ error: 'Name is Required' });
    }
    if (!email) {
      return response.status(400).json({ error: 'email is Required' });
    }
    if (!password) {
      return response.status(400).json({ error: 'password is Required' });
    }

    const userByEmail = await UserRepository.findByEmail(email);

    if (userByEmail && userByEmail.id !== id) {
      return response.status(400).json({ error: 'This email already exists!' });
    }

    const contact = await UserRepository.update(id, {
      name, email, password,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    const user = await UserRepository.findById(id);

    if (!user) {
      return response.status(404).json({ error: 'User not found ' });
    }

    await UserRepository.delete(id);
    response.status(200).json({ sucess: 'user deleted' });
  }
}

module.exports = new UserController();
