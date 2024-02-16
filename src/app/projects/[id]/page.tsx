interface ProjectDetailProps {
  params: {
    id: string
  }
}

export default function ProjectDetail({ params } : ProjectDetailProps ) {
  return (
    <div>
      Project {params.id}
    </div>
  )
}
