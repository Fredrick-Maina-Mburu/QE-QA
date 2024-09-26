// Narrowing'

// Exercise 1: Narrowing with if Statements

function validateUsername(username: string | null): boolean {
  if(typeof username === 'string'){
    return username.length > 5
  }

  return false
}

// it('should return true for valid usernames', () => {
//   expect(validateUsername('Matt1234')).toBe(true)

//   expect(validateUsername('Alice')).toBe(false)

//   expect(validateUsername('Bob')).toBe(false)
// })

// Exercise 2: Throwing Errors to Narrow

const appElement = document.getElementById('app')

if (!appElement){
  throw new Error('appElement is null')
}

// type Test = Expect<Equal<typeof appElement, HTMLElement>>

// Exercise 3: Using in to Narrow

type APIResponse =
  | {
      data: {
        id: string
      }
    }
  | {
      error: string
    }

const handleResponse = (response: APIResponse) => {
  // How do we check if 'data' is in the response?

  if ('data' in response) {
    return response.data.id
  } else {
    throw new Error(response.error)
  }
}

// test('passes the test even with the error', () => {
//   // there is no error in runtime

//   expect(() =>
//     HandleResponseOrThrowError({
//       error: 'Invalid argument',
//     }),
//   ).not.toThrowError()

//   // but the data is returned, instead of an error.

//   expect(
//     HandleResponseOrThrowError({
//       error: 'Invalid argument',
//     }),
//   ).toEqual("Should this be 'Error'?")
// })