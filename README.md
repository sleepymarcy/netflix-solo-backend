# Netflix API

## Backend 

/media

• POST Media
• GET Media (list) (reviews included)
• GET Media (single) (with reviews)
• UPDATE Media
• DELETE Media


/media/:id/poster

• POST Poster to single media


/media/:id/reviews
 
• POST Review to media
• DELETE Review of media


/media/:id/pdf

[EXTRA] Export single media as PDF with reviews
[EXTRA] Search media by title (if it's not found in your search in OMDB and sync with your database)
(Use axios or node-fetch)

### Media
In JSON

    {
     "Title": "The Lord of the Rings: The Fellowship of the Ring",
     "Year": "2001",
     "imdbID": "tt0120737",  //UNIQUE
     "Type": "movie",
     "Poster": "https://m.media-amazon.com/images/M/MV5BMTM5MzcwOTg4MF5BMl5BanBnXkFtZTgwOTQwMzQxMDE@._V1_SX300.jpg"
    }
   
   
### Reviews
In JSON

    {
     "_id": "123455", //SERVER GENERATED
     "comment": "A good book but definitely I don't like many parts of the plot", //REQUIRED
     "rate": 3, //REQUIRED, max 5
     "elementId": "5d318e1a8541744830bef139", //REQUIRED = IMDBID
     "createdAt": "2019-08-01T12:46:45.895Z" // SERVER GENERATED
    }
    
    
## Frontend
Connect your api with your React Netflix Project

## Deploy
Both client and server app should be deployed on your Heroku or Vercel account.
