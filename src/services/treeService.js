// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/trees`

async function create(treeFormData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(treeFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function show(treeId) {
  try {
    const res = await fetch(`${BASE_URL}/${treeId}`, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function createMember(memberFormData, treeId) {
  try {
    const res = await fetch(`${BASE_URL}/${treeId}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memberFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function deleteMember(memberId, treeId) {
  try {
    const res = await fetch(`${BASE_URL}/${treeId}/members/${memberId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

async function updateMember(memberFormData, treeId) {
  try {
    const res = await fetch(`${BASE_URL}/${treeId}/members/${memberFormData._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memberFormData)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export { 
  create,
  show,
  createMember,
  deleteMember,
  updateMember
}