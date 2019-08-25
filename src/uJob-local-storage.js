export default function getLocalStorageContent() {
    try {
        const localStorageContent = localStorage.getItem('uJobDate')
        return JSON.parse(localStorageContent)
    } catch (error) {
        return {}
    }
}

export function getLocalStorageRole() {
    try {
        const localStorageContent = getLocalStorageContent()
        return localStorageContent.role
    } catch (error) {
        return ''
    }
}

export function setLocalStorage(localStorageContent) {
    const formattedLocalStorageContent = JSON.stringify(localStorageContent)
    localStorage.setItem('uJobData', formattedLocalStorageContent)
}

export function removeLocalStorage() {
    localStorage.removeItem('uJobData')
}