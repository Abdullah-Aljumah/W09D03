# User stories

- **Register**: As a new user you can register in the website.

- **Login**: You can login to the website and keep you login.

- **Logout**: You can logout.

- **Show** tasks: You can see all your tasks.

- **Update task**: You can update your tasks.

- **Delete task**: You can delete your tasks.

- **Create task**: You can create new task.

# Todo fronend

| Path      | Permissions | Behavior                                             |
| --------- | ----------- | ---------------------------------------------------- |
| /         | Public      | Login, if you already login well show all your tasks |
| /register | Public      | Register new user                                    |

# Components

- **Login**

- **Register**

- **Tasks**

# Todo Backend

## Models

user model

```bash
 email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
```
