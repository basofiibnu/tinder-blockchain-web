import { client } from '../../lib/sanity'

const getLikedUser = async (req, res) => {
  try {
    const query = `*[_type == 'users' && _id == '${req.query.LikedUser}']{
            likes
        }`

    const response = await client.fetch(query)

    let isMatch = false
    response[0].likes.forEach((LikedUser) => {
      if (LikedUser._ref === req.body.currentUser) {
        isMatch = true
      }
    })

    res.status(200).send({ message: 'success', data: { isMatch: isMatch } })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error })
  }
}

export default getLikedUser
