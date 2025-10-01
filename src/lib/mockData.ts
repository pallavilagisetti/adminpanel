export type User = {
  id: string
  name: string
  email: string
  signupMethod: 'Google' | 'Email'
  profileType: 'Resume' | 'Manual'
  active: boolean
}

export type Resume = {
  id: string
  userId: string
  status: 'parsed' | 'not_parsed'
  parsed?: {
    skills: string[]
    education: string
    experience: string
  }
}

export const USERS: User[] = [
  { id: 'u1', name: 'Ava Patel', email: 'ava@example.com', signupMethod: 'Google', profileType: 'Resume', active: true },
  { id: 'u2', name: 'Noah Kim', email: 'noah@example.com', signupMethod: 'Email', profileType: 'Manual', active: true },
  { id: 'u3', name: 'Mia Lopez', email: 'mia@example.com', signupMethod: 'Email', profileType: 'Resume', active: false },
  { id: 'u4', name: 'Liam Chen', email: 'liam@example.com', signupMethod: 'Google', profileType: 'Manual', active: true },
  { id: 'u5', name: 'Sophia Nguyen', email: 'sophia@example.com', signupMethod: 'Email', profileType: 'Resume', active: true },
  { id: 'u6', name: 'Ethan Brown', email: 'ethan@example.com', signupMethod: 'Google', profileType: 'Resume', active: false },
  { id: 'u7', name: 'Isabella Rossi', email: 'isabella@example.com', signupMethod: 'Email', profileType: 'Manual', active: true },
  { id: 'u8', name: 'Oliver Davis', email: 'oliver@example.com', signupMethod: 'Google', profileType: 'Resume', active: true },
  { id: 'u9', name: 'Amelia Clark', email: 'amelia@example.com', signupMethod: 'Email', profileType: 'Manual', active: false },
  { id: 'u10', name: 'James Wilson', email: 'james@example.com', signupMethod: 'Google', profileType: 'Resume', active: true },
  { id: 'u11', name: 'Charlotte King', email: 'charlotte@example.com', signupMethod: 'Email', profileType: 'Resume', active: true },
  { id: 'u12', name: 'Benjamin Lee', email: 'benjamin@example.com', signupMethod: 'Google', profileType: 'Manual', active: true },
  { id: 'u13', name: 'Evelyn Garcia', email: 'evelyn@example.com', signupMethod: 'Email', profileType: 'Resume', active: false },
  { id: 'u14', name: 'Lucas Martinez', email: 'lucas@example.com', signupMethod: 'Google', profileType: 'Resume', active: true },
  { id: 'u15', name: 'Harper Thompson', email: 'harper@example.com', signupMethod: 'Email', profileType: 'Manual', active: true },
  { id: 'u16', name: 'Henry Walker', email: 'henry@example.com', signupMethod: 'Google', profileType: 'Manual', active: false },
  { id: 'u17', name: 'Avery Rivera', email: 'avery@example.com', signupMethod: 'Email', profileType: 'Resume', active: true },
  { id: 'u18', name: 'Michael Young', email: 'michael@example.com', signupMethod: 'Google', profileType: 'Resume', active: true },
  { id: 'u19', name: 'Layla Hernandez', email: 'layla@example.com', signupMethod: 'Email', profileType: 'Manual', active: true },
  { id: 'u20', name: 'Daniel Allen', email: 'daniel@example.com', signupMethod: 'Google', profileType: 'Resume', active: false },
]

export const RESUMES: Resume[] = [
  { id: 'r1', userId: 'u1', status: 'parsed', parsed: { skills: ['TS', 'React'], education: 'BSc CS', experience: '3y Frontend' } },
  { id: 'r2', userId: 'u3', status: 'not_parsed' },
  { id: 'r3', userId: 'u4', status: 'parsed', parsed: { skills: ['Node', 'NestJS'], education: 'MSc SE', experience: '5y Backend' } },
  { id: 'r4', userId: 'u5', status: 'parsed', parsed: { skills: ['Python', 'Django'], education: 'BEng EE', experience: '4y Fullstack' } },
  { id: 'r5', userId: 'u6', status: 'not_parsed' },
  { id: 'r6', userId: 'u7', status: 'parsed', parsed: { skills: ['Go', 'Kubernetes'], education: 'BSc CS', experience: '6y Platform' } },
  { id: 'r7', userId: 'u8', status: 'parsed', parsed: { skills: ['React', 'Next.js'], education: 'BSc IT', experience: '2y Frontend' } },
  { id: 'r8', userId: 'u9', status: 'not_parsed' },
  { id: 'r9', userId: 'u10', status: 'parsed', parsed: { skills: ['SQL', 'Prisma'], education: 'BSc CS', experience: '3y Data' } },
  { id: 'r10', userId: 'u11', status: 'parsed', parsed: { skills: ['TypeScript', 'tRPC'], education: 'BSc CS', experience: '3y Fullstack' } },
  { id: 'r11', userId: 'u12', status: 'not_parsed' },
  { id: 'r12', userId: 'u13', status: 'parsed', parsed: { skills: ['AWS', 'Terraform'], education: 'MSc CS', experience: '7y DevOps' } },
  { id: 'r13', userId: 'u14', status: 'parsed', parsed: { skills: ['Rust', 'Actix'], education: 'BSc CS', experience: '2y Systems' } },
  { id: 'r14', userId: 'u15', status: 'not_parsed' },
  { id: 'r15', userId: 'u16', status: 'parsed', parsed: { skills: ['C#', '.NET'], education: 'BSc CS', experience: '5y Backend' } },
  { id: 'r16', userId: 'u17', status: 'parsed', parsed: { skills: ['Vue', 'Pinia'], education: 'BSc CS', experience: '4y Frontend' } },
  { id: 'r17', userId: 'u18', status: 'not_parsed' },
  { id: 'r18', userId: 'u19', status: 'parsed', parsed: { skills: ['Java', 'Spring'], education: 'MSc CS', experience: '6y Backend' } },
  { id: 'r19', userId: 'u20', status: 'parsed', parsed: { skills: ['PHP', 'Laravel'], education: 'BSc CS', experience: '5y Backend' } },
  { id: 'r20', userId: 'u2', status: 'not_parsed' },
]

export function aggregateSkills() {
  const skillCounts: Record<string, number> = {}
  const missingCounts: Record<string, number> = {}
  const errors: { resumeId: string; userId: string }[] = []

  for (const r of RESUMES) {
    if (r.status === 'parsed' && r.parsed) {
      for (const s of r.parsed.skills) {
        const key = s.toLowerCase()
        skillCounts[key] = (skillCounts[key] || 0) + 1
      }
      const desired = ['typescript', 'react', 'node', 'sql', 'aws']
      for (const want of desired) {
        if (!r.parsed.skills.map(x => x.toLowerCase()).includes(want)) {
          missingCounts[want] = (missingCounts[want] || 0) + 1
        }
      }
    } else {
      errors.push({ resumeId: r.id, userId: r.userId })
    }
  }

  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }))

  const topMissing = Object.entries(missingCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }))

  return { topSkills, topMissing, errors }
}


