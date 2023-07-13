import contactService from 'src/services/contactService'
import { describe, test, vi } from 'vitest'

describe('ADMIN: contact page', () => {
  afterEach(() => {
    contactService.get = vi.fn()
  })

  test.todo('should render all elements')

  test.todo('should load data at render')

  test.todo('should change focus on press tab key')

  test.todo('should disable save button when empty fields')

  test.todo('should call post method with data when save button is clicked')

  test.todo('should call patch method with data when update button is clicked')

  test.todo('should clear all text inputs when click on clear button')
})
