import { useInput } from '@nextui-org/react'
import { Button } from '@/components/buttons'
import { TextInput } from '@/components/inputs'
import { Filter } from './Filter'
import { createTask } from '@/services'
import { useDispatch } from 'react-redux'
import { newTask } from '@/redux/slices/taskSlice'
import { Wrapper } from '../styles/created-task-styled'

export function CreateTask({ user, selected, filtered }) {
  const { value, reset, bindings } = useInput('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    /* Setea los valores de los inputs */
    const addedTask = {
      userId: user.uid,
      title: value,
      category: '',
      completed: false,
      timestamp: new Date().toLocaleString()
    }

    /* Ejecuta la funcion para crear el recurso desde el servicio */
    await createTask(addedTask).then((data) => {
      dispatch(newTask(data))
      reset('')
    })
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <TextInput
          {...bindings}
          name="content"
          placeholder="Enter your new task..."
          width="100%"
          required
        />

        <Button
          variant="primary"
          br="10px"
          size=".7rem"
          height="40px"
          width="120px"
        >
          Add Task
        </Button>
      </form>

      {/* Filter options to change task currently */}
      <Filter selected={selected} setSelected={filtered} />
    </Wrapper>
  )
}
