import { client } from '../../lib/sanity'

const getAllUserInfo = async (req, res) => {
  try {
    const query = `*[_type == 'users' && _id != '${req.query.activeAccount}']{
            name,
            walletAddress,
            'imageUrl': profileImage.asset->url
        }`

    const response = await client.fetch(query)
    res.status(200).send({ message: 'success', data: response })
  } catch (error) {
    res.status(500).send({ message: 'error', data: error })
  }
}

export default getAllUserInfo
