# BookTracker – Book Management App

Web application to manage a personal book collection, tracking their reading status and allowing editing or deletion.

**Production URL:** [https://11-client-side-final-project-frontend.vercel.app/](https://11-client-side-final-project-frontend.vercel.app/)

## Technologies Used

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [json-server](https://github.com/typicode/json-server)
- [Vercel](https://www.vercel.com/)
- GitHub Actions & Husky

## Installation & Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/AlexandreCK/11_client-side_final-project_frontend
    cd 11_client-side_final-project_frontend
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Set up environment variables:**
    - Create a `.env` file:
        ```
        VITE_API_URL=http://localhost:XXXX
        ```
    - For production, set your deployed API URL.
4. **Start the development server:**
    ```bash
    npm run dev
    ```

## App Features

### `Book` Entity

```ts
type Book = {
    id: number;

    title: string;

    author: string;

    year: number;

    status: 'Pending' | 'In progress' | 'Read';
};
```

### Functionalities

- List books in cards
- Add new books
- Edit existing books
- Delete books
- API communication (`GET`, `POST`, `PUT`, `DELETE`)

## API Documentation

This app communicates with a RESTful API (default: [json-server](https://github.com/typicode/json-server)).

### Base URL

```
VITE_API_URL (e.g. http://localhost:3000)
```

### Endpoints

#### `GET /books`

- **Description:** Get all books
- **Response:** Array of book objects

#### `GET /books/:id`

- **Description:** Get a single book by ID
- **Response:** Book object

#### `POST /books`

- **Description:** Add a new book
- **Body:**
    ```json
    {
      "title": "string",
      "author": "string",
      "year": "string or number",
      "status": "Pending" | "In Progress" | "Read"
    }
    ```
- **Response:** Created book object

#### `PUT /books/:id`

- **Description:** Update a book by ID
- **Body:** Same as POST
- **Response:** Updated book object

#### `DELETE /books/:id`

- **Description:** Delete a book by ID
- **Response:** Deleted book object or status

### Book Object Example

```json
{
    "id": 1,
    "title": "Book Title",
    "author": "Author Name",
    "year": "2024",
    "status": "Pending"
}
```

## Styles

- Styles are implemented using **CSS Modules** for scoped and maintainable styling.
- The layout follows a **mobile-first** design approach to ensure responsiveness across devices.

## Available Scripts

| Start | `npm run dev` | Starts the development server |

| Format | `npm run format` | Runs Prettier |

| Tests | `npm run test` | Runs tests with Vitest |

| Build | `npm run build` | Generates production build |

| Preview | `npm run preview` | Previews the local build |

## Testing

- Tests are written for all main components, including form, card, list, and layout containers.
- Uses `@testing-library/react` and `vitest` for unit and integration tests.
- Run all tests with:
    ```bash
    npm run test
    ```
- Coverage reports are generated in the `coverage/` directory after running tests.
- Linting and formatting are checked automatically in CI and before commits.

## CI/CD

- Husky is configured to run:
    - `pre-commit`: format
    - `pre-push`: tests
- GitHub Actions:
    - Separate workflows for lint/format and for tests
    - Deployment to Vercel

---

**Maintained by Alexandre C. K.**
