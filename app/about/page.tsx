import { getTeamMembers } from '@/lib/cosmic'
import type { Metadata } from 'next'
import { TeamMember } from '@/types'

export const metadata: Metadata = {
  title: 'About Us - Cosmic CMS',
  description: 'Meet the team behind Cosmic CMS',
}

export const revalidate = 60

export default async function AboutPage() {
  const team = await getTeamMembers()

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate people building the future of content management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Changed: Added explicit typing for member and index parameters */}
          {team.map((member: TeamMember, index: number) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover text-center animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {member.metadata?.photo && (
                <img
                  src={`${member.metadata.photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                  alt={member.metadata.name}
                  width="200"
                  height="200"
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
              )}
              <h3 className="text-2xl font-bold mb-2">{member.metadata?.name}</h3>
              <p className="text-primary font-semibold mb-4">{member.metadata?.role}</p>
              {member.metadata?.bio && (
                <p className="text-gray-600 leading-relaxed">{member.metadata.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}