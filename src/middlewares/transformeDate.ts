
export const transformeDate = (date: any) => {

    const currentDate = new Date()

    const diff = currentDate.getTime() - date.getTime()
    const baseDiffHour = diff / 1000 / 60 / 60

    let diffDates
    if (baseDiffHour < 1) { // Minutes

        const minutes = baseDiffHour * 60

        if (minutes < 1) {

            diffDates = 'Agora Mesmo'

        } else {

            diffDates = `há ${minutes.toFixed(0)} Minutos`
        }

    } else if (baseDiffHour > 24) { // Days

        const days = baseDiffHour / 24

        if (days >= 7) { // Weeks

            const weeks = days / 7
            diffDates = `há ${weeks.toFixed(0)} Semanas`

        } else {

            diffDates = `há ${days.toFixed(0)} Dias`
        }

    }
    else { // Hours
        diffDates = `há ${baseDiffHour.toFixed(0)} Horas`
    }
    return diffDates
}

