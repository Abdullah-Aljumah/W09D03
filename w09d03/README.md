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

task model

```bash
 task: { type: String },
  isDel: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
```

role model

```bash
 role: { type: String },
  permossion: { type: Array },
```

# Backend routes

## Tasks

| HTTP METHOD | URL               | Permissions | Behavior                          |
| ----------- | ----------------- | ----------- | --------------------------------- |
| POST        | /newTask/:\_id    | Public      | Create new task                   |
| PUT         | /deletetask/:\_id | Public      | Soft delete task                  |
| PUT         | /update/:\_id     | Public      | Toggle is complete (true / false) |
| PUT         | /upadteVal/:\_id  | Public      | Update task                       |
| GET         | /todoss/:\_id     | Public      | Get task by id                    |
| GET         | /tasks            | Private     | Get all users task                |

## User

| HTTP METHOD | URL               | Permissions | Behavior        |
| ----------- | ----------------- | ----------- | --------------- |
| DELETE      | /deleteUser/:\_id | Private     | Delete user     |
| POST        | /register         | Public      | Create new user |
| POST        | /login            | Public      | Login           |
| GET         | /users            | Private     | Get all users   |

## Role

| HTTP METHOD | URL      | Permissions | Behavior        |
| ----------- | -------- | ----------- | --------------- |
| POST        | /newRole | Private     | Create new role |
| GET         | /roles   | Private     | Get all roles   |

## ERD

![This is an image](file:///C:/Users/%D9%90Abdullah/OneDrive/%D8%B3%D8%B7%D8%AD%20%D8%A7%D9%84%D9%85%D9%83%D8%AA%D8%A8/erd%20todooo.svgs)
<img src="file:///C:/Users/%D9%90Abdullah/OneDrive/%D8%B3%D8%B7%D8%AD%20%D8%A7%D9%84%D9%85%D9%83%D8%AA%D8%A8/erd%20todooo.svg">

## Author

@Abdullah-Aljumah
