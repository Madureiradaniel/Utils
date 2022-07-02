const Logs = require('../model/LogsRequest')

const options = {
    limit: 100,
    sort: { createdAt: 'desc' }
};


exports.create = async (data) => {
    try {

        const log = new Logs(data)

        await log.save()

        return { error: false, log }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.find = async (idUser, page, filter) => {
    try {
        const logs = await Logs.paginate({ ...filter, idUser }, { ...options, page })
        return { error: false, logs }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}