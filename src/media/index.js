import express from 'express'
import fs from 'fs'
import uniqid from 'uniqid'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const fname = fileURLToPath(import.meta.url)
const dname = dirname(fname)

const mediaFilePath = path.join(dname, 'media.json')

const router = express.Router()


router.get('/', async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(mediaFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSON = JSON.parse(fileAsString)
        res.send(fileAsJSON)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


router.post('/', async (req, res, next) => {
    try {
        const {Title, Year, Type, Poster } = req.body

        const media = {
           Title,
           Year,
           imdbID: uniqid(),
           Type,
           Poster,
        };

        const fileAsBuffer = fs.readFileSync(mediaFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSONArray = JSON.parse(fileAsString)

        fileAsJSONArray.push(media)
        fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray))

        res.send(media);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


router.get("/:id", async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(mediaFilePath)
        const fileAsString = fileAsBuffer.toString()
        const fileAsJSONArray = JSON.parse(fileAsString)

        const media = fileAsJSONArray.find(
            (media) => media.id === req.params.id
        );
        if (!media) {
            res
                .status(404)
                .send({ message: `Media with ${req.params.id} is not found!` })
        }
        res.send(media)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


router.delete("/:id", async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(mediaFilePath)
        const fileAsString = fileAsBuffer.toString()
        let fileAsJSONArray = JSON.parse(fileAsString)

        const media = fileAsJSONArray.find(
            (media) => media.id === req.params.id
        )
        if (!media) {
            res
                .status(404)
                .send({ message: `Media with ${req.params.id} is not found!` })
        }
        fileAsJSONArray = fileAsJSONArray.filter(
            (media) => media.id !== req.params.id
        )
        fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray))
        res.status(204).send()
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


router.put("/:id", async (req, res, next) => {
    try {
        const fileAsBuffer = fs.readFileSync(mediaFilePath)

        const fileAsString = fileAsBuffer.toString()

        let fileAsJSONArray = JSON.parse(fileAsString)

        const mediaIndex = fileAsJSONArray.findIndex(
            (media) => media.id === req.params.id
        );
        if (!mediaIndex == -1) {
            res
                .status(404)
                .send({ message: `Media with ${req.params.id} is not found!` })
        }
        const previousMediaData = fileAsJSONArray[mediaIndex]
        const changedMedia = {
            ...previousMediaData,
            imdbID: req.params.id,
        };
        fileAsJSONArray[mediaIndex] = changedMedia

        fs.writeFileSync(mediaFilePath, JSON.stringify(fileAsJSONArray))
        res.send(changedMedia)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

export default router