/*
    db 简单模拟数据库
    author: svon <svon.me@gmail.com>
*/

const where = Symbol('where')
const matcher = Symbol('matcher')
const isMatch = Symbol('isMatch')

const _ = {
    keys (data) {
        let arr = []
        for (let key in data) {
            arr.push(key)
        }
        return arr
    },
    includes (value, regexp) {
        return value.includes(regexp)
    }
}

class DB {
    /**
    * 表
    * @param tableName     名称
    * @param foreignAlias  外键在当前表中的名字
    * @param foreignKey    外键的key
    * @param refDb         关联表
    */
    constructor(tableName, foreignAlias, foreignKey, refDb) {
        // 数据库名称
        this.name = tableName || `table-${parseInt(Math.random() * 10000)}`
        this.list = []
        this.foreignAlias = foreignAlias
        this.foreignKey = foreignKey
        this.refDb = refDb
    }
    // 返回对象是否具有给定的 key：value 集合
    [isMatch] (object, attrs, like) {
        let keys = _.keys(attrs), length = keys.length
        if (!object) {
            return false
        }
        let obj = Object(object)
        // 模糊查询
        if (like) {
            let status = true
            for (let i = 0; i < length; i++) {
                let key = keys[i]
                if (key in obj && _.includes(`${obj[key]}`, attrs[key])) {
                    continue
                } else {
                    status = false
                    break
                }
            }
            return status
        } else {
            let status = true
            for (let i = 0; i < length; i++) {
                let key = keys[i]
                if (attrs[key] instanceof Array) {
                    // 如果列表数据存与查询数据集合中其中一个匹配，则证明单次比对成功
                    if (attrs[key].includes(obj[key])) {
                        continue
                    } else {
                        status = false
                        break
                    }
                } else {
                    if (attrs[key] !== obj[key] || !(key in obj)) {
                        status = false
                        break
                    }
                }
            }
            return status
        }

    }
    [matcher] (attrs, like) {
        return (value) => {
            return this[isMatch](value, attrs, like || false)
        }
    }
    [where](query = {}, limit = 0, dbList, like) {
        let result = []
        if (_.keys(query).length === 0) {
            if (limit > 0) {
                result = dbList.slice(0, limit)
            } else {
                result = [].concat(dbList)
            }
        } else {
            const match = this[matcher](query, like)
            for (let i = 0, len = dbList.length; i < len; i++) {
                let item = dbList[i]
                let status = match(item)
                if (status) {
                    result.push(item)
                    // 假如查询数据长度达到限制
                    if (limit > 0 && result.length >= limit) {
                        break
                    }
                }
            }
        }
        return result
    }
    // 模糊查询
    like (query) {
        let result = this[where](query, 0, this.list, true)
        return result
    }
    // 过滤查询结果
    select(query = {}, limit = 0) {
        let result = this[where](query, limit, this.list, false)
        return result
    }
    // 查询单条记录
    selectOne (query) {
        let value = this.select(query, 1)
        return value[0] || void 0
    }
    // 关联查询
    selectForeign(query = {}, limit = 0) {
        let result = this.select(query, limit)
        if (this.foreignAlias && this.foreignKey && this.refDb) {
            for (let i = 0, len = result.length; i < len; i++) {
                let value = result[i][this.foreignAlias]
                if (value) {
                    let param = {}
                    param[this.foreignKey] = value
                    let foreignList = this.refDb.select(param, 1)
                    result[i]['foreign'] = foreignList[0]
                }
            }
        }
        return result
    }
    //添加数据
    insert(row) {
        let data = [].concat(row)
        for (let i = 0, len = data.length; i < len; i++) {
            this.list.push(data[i])
        }
        return this
    }
    // 修改
    update(select_where, value, limit) {
        let list = this.select(select_where, limit)
        for (let i = 0, len = list.length; i < len; i++) {
            Object.assign(list[i], value)
        }
    }
    // 情况数据库
    empty () {
        return new Promise(resolve => {
            this.list = []
            setTimeout(() => {
                resolve(this)
            }, 0)
        })
    }
    // 删除匹配中的数据
    remove (select_where = {}) {
        return new Promise(resolve => {
            let array = []
            if (_.keys(select_where).length === 0) {
                return array
            } else {
                const dbList = this.list
                const match = this[matcher](select_where)
                for (let i = 0, len = dbList.length; i < len; i++) {
                    let status = match(dbList[i])
                    if (status) {
                        continue
                    } else {
                        array.push(dbList[i])
                    }
                }
            }
            this.list = array
            setTimeout(() => {
                resolve(this)
            }, 0)
        })
    }
    // 数据长度
    size () {
        return this.list.length
    }
}

export default DB
