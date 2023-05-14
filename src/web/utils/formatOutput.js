const formatOutput = (output) => {
  return (
    <div className="flex flex-col gap-4">
      {output.split("\n\n").map((paragraph, index) => {
        return (
          <div key={index}>
            {paragraph.split("\n").map((line, index) => {
              return (
                <p key={index} className="break-all">
                  {line}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default formatOutput
