import Input from 'unity-uikit/Input'
export default function SomeComponent(props) {
  return (
    <div>
      <Input type="text" {...props} />
      <Input type="number" {...props} />
    </div>
  )
}
