# API Endpoints Documentation

## 1. Submit Portfolio

- **Endpoint:** `POST /api/portfolio`
- **Description:** Submit a portfolio URL. The backend will parse the site and return structured profile data.
- **Request Body:**

```json
{
  "portfolioUrl": "https://example.com/portfolio"
}
```

- **Response:**

```json
{
  "id": "string",
  "portfolioUrl": "string",
  "profileUrl": "string",
  "basicInfo": {
    "firstName": "string",
    "lastName": "string",
    "summary": "string"
  },
  "employers": [
    {
      "id": "string",
      "name": "string",
      "jobTitle": "string",
      "duration": "string",
      "employmentType": "FULL_TIME | CONTRACT",
      "contribution": "string",
      "videos": [
        {
          "title": "string",
          "url": "string",
          "thumbnail": "string"
        }
      ]
    }
  ],
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

## 2. Get Portfolio by Profile URL

- **Endpoint:** `GET /api/portfolio/:profileUrl`
- **Description:** Fetch a portfolio by its unique profile URL.
- **Response:** Same as above.

---

## 3. Update Basic Info

- **Endpoint:** `PUT /api/portfolio/:profileUrl/basic-info`
- **Request Body:**

```json
{
  "firstName": "string",
  "lastName": "string",
  "summary": "string"
}
```

- **Response:** Updated portfolio object (same as above).

---

## 4. Add or Update Employer

- **Endpoint:** `PUT /api/portfolio/:profileUrl/employer`
- **Request Body:**

```json
{
  "id": "string (optional for new)",
  "name": "string",
  "jobTitle": "string",
  "duration": "string",
  "employmentType": "FULL_TIME | CONTRACT",
  "contribution": "string",
  "videos": [
    {
      "title": "string",
      "url": "string",
      "thumbnail": "string"
    }
  ]
}
```

- **Response:** Updated portfolio object (same as above).

---

## 5. Delete Employer

- **Endpoint:** `DELETE /api/portfolio/:profileUrl/employer/:employerId`
- **Response:** Updated portfolio object (same as above).
