# Folkatech Backend Technical Test - User Data API

## Specification
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- Redis

## Installation
Masuk ke folder luthfi

    cd luthfi

Install app

    npm i

Jalankan app

    node .

## Documentation

### 0) `GET` Token

Diperlukan token untuk bisa melakukan CRUD pada User Data

    http://localhost:2000/token

Token hanya berlaku selama 1 jam

### 1) `POST` User Data

    http://localhost:2000/user

Contoh request body:

    {
        "userName": "luthfiahmad",
        "accountNumber": "123123123",
        "emailAddress": "luthfirobbaniy@gmail.com",
        "identityNumber": "098098098"
    }
    
Tidak bisa melakukan `POST` untuk `userName`, `accountNumber`, `emailAddress` dan `identityNumber` yang nilainya sudah ada di database (mencegah duplikasi data)

Jika tetap mencobanya maka akan keluar response dengan pesan `userName, accountNumber, emailAddress and/or identityNumber not available`

### 2) `GET` All User Data

    http://localhost:2000/user

### 3) `GET` User Data by Account Number

    http://localhost:2000/user/accountNumber/:num

Contoh input:

    http://localhost:2000/user/accountNumber/123123123
    
### 5) `GET` User Data by Identity Number

    http://localhost:2000/user/identityNumber/:num

Contoh input:

    http://localhost:2000/user/identityNumber/098098098

### 4) `PATCH` User Data

    http://localhost:2000/user/:_id

ganti `:_id` dengan `_id user`

`_id user` bisa didapat ketika `GET All User Data`, `GET User Data by Account Number`, dan `GET User Data by Identity Number`

Bisa melakukan `PATCH` untuk `userName`, `accountNumber`, `emailAddress`, dan `identityNumber` 

Contoh request body:

    {
        "userName": "luthfi",
    }
    
Tidak bisa melakukan `PATCH` untuk `userName`, `accountNumber`, `emailAddress` dan `identityNumber` yang nilainya sudah ada di database (mencegah duplikasi data)

Jika tetap mencobanya maka akan keluar response dengan pesan `Your request was rejected. The data you entered may result in duplicate data`

### 5) `DELETE` User Data

    http://localhost:2000/user/:_id

ganti `:_id` dengan `_id user `

`_id user` bisa didapat ketika `GET All User Data`, `GET User Data by Account Number`, dan `GET User Data by Identity Number`
