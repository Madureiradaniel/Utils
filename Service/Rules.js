const RulesDb = require("../model/Rules")

exports.createRule = async (rule) => {
    try {
        var newRule = new RulesDb({
            name: rule.name,
            roles: rule.roles
        })
        await newRule.save()
        return { error: false, rule: newRule }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.deleteRule = async (idRule) => {
    try {
        await RulesDb.deleteOne({ _id: idRule })
        return { error: false }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.addRole = async (idRule, role) => {
    try {
        const rule = await RulesDb.findById(idRule)

        if (!rule) throw new Error("Rule is empty")

        var roles = [...rule.roles, role]

        roles = new Set(roles)

        rule.roles = [...roles]

        await rule.save()

        return { error: false, rule }

    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.removeRole = async (idRule, role) => {
    try {
        const rule = await RulesDb.findById(idRule)

        if (!rule) throw new Error("Rule is empty")

        var roles = rule.roles.filter(row => !row.includes(role))

        rule.roles = roles

        await rule.save()

        return { error: false, rule }

    } catch (e) {
        console.log(e)
        return { error: true }
    }
}

exports.list = async () => {
    try {
        const rules = await RulesDb.find({})
        return { error: false, rules }
    } catch (e) {
        console.log(e)
        return { error: true }
    }
}