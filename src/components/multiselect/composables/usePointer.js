import { ref } from 'vue'

export default function usePointer (props, context, dep)
{
  // ================ DATA ================

  const pointer = ref(null)

  return {
    pointer,
  }
}