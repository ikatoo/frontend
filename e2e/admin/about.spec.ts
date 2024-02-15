// import aboutPageMock from 'shared/mocks/aboutPageMock/result.json'

// const api = await request.newContext({
//   baseURL: process.env.VITE_API_URL
// })

describe('ADMIN - About page', () => {
  const _URL = '/admin'
  const authorize = async () => {
    const actualUrl = await browser.getUrl()

    if (actualUrl.includes('/signin')) {
      await $('#email').setValue('teste@teste.com')
      await $('#password').setValue('teste')
      await $('#signin').click()
    }
  }

  it('has page title', async () => {
    await browser.url(_URL)
    await authorize()

    await expect(browser).toHaveTitle(
      /ikatoo - software developer - Edit About Page/i
    )
  })

  it('should save new about page', async () => {
    await browser.url(_URL)
    await authorize()

    const accessToken = await browser.execute(
      'return window.localStorage.accessToken'
    )
    await $('#title').setValue(`${accessToken}`)
    // const accessToken = `${
    //   (await context.storageState()).origins[0].localStorage[0].value
    // }`
    // api.delete('/about-page', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`
    //   }
    // })
    // await browser.reload({ waitUntil: 'load' })

    // const title = browser.getByPlaceholder('Título')
    // const description = browser.getByPlaceholder('Descrição', { exact: true })
    // const url = browser.getByPlaceholder('https://dominio.com/imagem.png')
    // const alt = browser.getByPlaceholder('Descrição da imagem')

    // await title.fill('new title')
    // await description.fill('new description')
    // await url.fill('new url')
    // await alt.fill('new alt')

    // await browser.getByRole('button', { name: 'Salvar' }).click()
    // await browser.waitForLoadState()

    // await expect(
    //   browser.getByText('Success on create about browser.')
    // ).toBeVisible()
  })

  // test('should complete update about page', async () => {
  //   const newData: Omit<typeof aboutPageMock, 'id'> = {
  //     title: 'new title',
  //     description: 'new description',
  //     image: {
  //       url: 'new url',
  //       alt: 'new alt'
  //     }
  //   }

  //   await browser.goto(_URL)
  //   await authorize(page)
  //   await browser.waitForURL('http://localhost:3000/admin/about')

  //   const title = browser.getByPlaceholder('Título')
  //   const description = browser.getByPlaceholder('Descrição', { exact: true })
  //   const updateButton = browser.getByRole('button', { name: 'Atualizar' })

  //   await title.fill(newData.title)
  //   await description.fill(newData.description)

  //   await updateButton.click()

  //   await expect(browser.getByText('Success on update about browser.')).toBeVisible()
  // })

  // test('should partial update about page', async () => {
  //   browser.goto(_URL)
  //   await authorize(page)
  //   await browser.waitForURL('http://localhost:3000/admin/about')

  //   const accessToken = `${
  //     (await context.storageState()).origins[0].localStorage[0].value
  //   }`
  //   const req = await api.get('/about-page/user-id/1')
  //   const data = await req.json()
  //   if (!data?.title) {
  //     await api.post('/about-page', {
  //       data: {
  //         title: 'first title',
  //         description: 'first description'
  //       },
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     })
  //   }
  //   await browser.reload({ waitUntil: 'networkidle' })

  //   await page
  //     .getByPlaceholder('Descrição', { exact: true })
  //     .fill('new description')
  //   await browser.getByRole('button', { name: 'Atualizar' }).click()

  //   await expect(browser.getByText('Success on update about browser.')).toBeVisible()
  // })
})
