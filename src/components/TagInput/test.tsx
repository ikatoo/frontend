import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import TagInput from '.'

describe('<TagInput />', () => {
  it('Renders with Label', () => {
    let skills: string[] = []
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={skills}
        label="Label"
        name="Label"
      />
    )

    expect(screen.getByLabelText('Label')).toBeInTheDocument()
  })

  it('Renders without Label', () => {
    let skills: string[] = []
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    render(
      <TagInput onTagsChange={setSkills} initialTags={skills} name="username" />
    )

    expect(screen.queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('Renders with placeholder', () => {
    let skills: string[] = []
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={skills}
        name="username"
        placeholder="hey you"
      />
    )

    expect(screen.getByPlaceholderText('hey you')).toBeInTheDocument()
  })

  it('Changes its value when typing', async () => {
    let skills: string[] = []
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={skills}
        label="Skills"
        name="skills"
      />
    )

    const input = screen.getByRole('textbox')
    const text = 'This is my new text'

    act(() => {
      userEvent.type(input, text)
    })

    await waitFor(() => {
      expect(input).toHaveValue(text)
    })
  })

  it('Does not changes its value when disabled', async () => {
    const setSkills = vi.fn()

    render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={[]}
        label="TagInput"
        name="TagInput"
        disabled
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()

    const text = 'This is my new text'

    userEvent.type(input, text)

    await waitFor(() => {
      expect(input).not.toHaveValue(text)
    })
    expect(setSkills).not.toHaveBeenCalled()
  })

  it('Renders with error', () => {
    let skills: string[] = []
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    const { container } = render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={skills}
        name="username"
        label="TagInput"
        error="Error message"
      />
    )

    expect(screen.getByText('Error message')).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })

  it('Is accessible by tab', () => {
    let skills: string[] = []
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={skills}
        label="TagInput"
        name="TagInput"
      />
    )

    const input = screen.getByLabelText('TagInput')
    expect(document.body).toHaveFocus()

    act(() => {
      userEvent.tab()
    })

    expect(input).toHaveFocus()
  })

  it('Is not accessible by tab when disabled', async () => {
    let skills: string[] = []
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={skills}
        label="TagInput"
        name="TagInput"
        disabled
      />
    )

    const input = screen.getByLabelText('TagInput')
    expect(document.body).toHaveFocus()

    userEvent.tab()

    await waitFor(() => {
      expect(input).not.toHaveFocus()
    })
  })

  it('When typing comma, add item to skills array', async () => {
    let skills: string[] = []
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={skills}
        label="TagInput"
        name="TagInput"
      />
    )
    const input = screen.getByLabelText('TagInput')
    const text = 'skill typed'

    expect(skills).toHaveLength(0)

    userEvent.type(input, `${text},`)

    await waitFor(() => {
      expect(skills).toHaveLength(1)
    })
  })

  it('Render with initial tags', async () => {
    render(
      <TagInput
        onTagsChange={(tags: string[]) => tags}
        initialTags={['skill1', 'skill2', 'skill3']}
        label="TagInput"
        name="TagInput"
      />
    )

    const tags = screen.getAllByTestId('tag-test-id')

    expect(tags).toHaveLength(3)
  })

  it('When typing backspace and input is empty, remove the last tag', async () => {
    let skills: string[] = ['skill1', 'skill2', 'skill3']
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={skills}
        label="TagInput"
        name="TagInput"
      />
    )
    const input = screen.getByLabelText('TagInput')

    const tagsBefore = screen.getAllByTestId('tag-test-id')
    expect(tagsBefore).toHaveLength(3)

    userEvent.type(input, '{backspace}')

    await waitFor(() => {
      expect(skills).toStrictEqual(['skill1', 'skill2'])
    })
  })

  it('Click for remove a tag', async () => {
    let skills: string[] = ['skill1', 'skill2', 'skill3']
    const setSkills = (tags: string[]) => {
      skills = tags
    }

    render(
      <TagInput
        onTagsChange={setSkills}
        initialTags={skills}
        label="TagInput"
        name="TagInput"
      />
    )

    const tagForRemove = screen.getByText('skill2')
    tagForRemove.lastElementChild &&
      userEvent.click(tagForRemove.lastElementChild)

    await waitFor(() => {
      expect(skills).toStrictEqual(['skill1', 'skill3'])
    })
  })
})
