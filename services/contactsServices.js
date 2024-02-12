const fs = require('fs/promises')
const path = require('path')
const {nanoid} =require('nanoid')


const contactPath = path.join(__dirname, '../db/contacts.json')

const listContacts = async() => {
    const list = await fs.readFile(contactPath, 'utf-8')
    return JSON.parse(list)
}

const getContactById = async (id) => {
    const list = await listContacts()
    const contactById = list.find(el => el.id === id)
    return contactById || null
}

const addContact = async (data) => {
    const list = await listContacts()
    const newContact = {id: nanoid(), ...data}
    list.push(newContact)
await fs.writeFile(contactPath, JSON.stringify(list, null, 2))
return newContact
}

const removeContact = async (id) => {
    const list = await listContacts()
    const index = list.findIndex(el => el.id === id)
    if(index === -1) {
        return null
    }
    const [result] = list.splice(index,1)
    await fs.writeFile(contactPath, JSON.stringify(list, null, 2))
    return result
}
const updateById = async(id,data) => {

    const contacts = await listContacts();
    const index =  contacts.findIndex(el => el.id === id)
    if(index === -1) {
        return null
    }
    contacts[index] = {id, ...data}
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
    return contacts[index];
    }

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateById,
}