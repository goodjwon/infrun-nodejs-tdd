// api 로직
const models = require('../../models');



const index = (req, res) => {
    req.query.limit = req.query.limit || 10;     // limit 가 넘오 오지 않으면 10을 기본으로 설정한다.
    const limit = parseInt(req.query.limit, 10);    // 문자로 넘어온 limit 값을 숫자로 변환 한다.
    if (Number.isNaN(limit)) {  // 숫자로 넘어오지 않으면 400을 응답값으로 돌려 주고 종료 한다.
        return res.status(400).end();
    }

    models.User.findAll({
        limit: limit
    })
        .then(users => {
            res.json(users);
        })
};


const show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();


    models.User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        if (!user) return res.status(404).end();
        res.json(user)
    })
};

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    models.User.destroy({
        where: {id: id}
    }).then(() => {
        res.status(204).end();
    })
};

const create = (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();

    const userNameDublicationCheck = users.filter(user => user.name === name).length > 0
    if (userNameDublicationCheck) return res.status(409).end();


    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
};

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();

    const isConceit = users.filter(user => user.name === name).length > 0;
    if (isConceit) return res.status(409).end();

    user.name = name;

    res.json(user);
}


module.exports = {
    index: index,
    show: show,
    destroy: destroy,
    create: create,
    update: update
}