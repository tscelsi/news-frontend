import React from 'react'

export const MobileMenuContext = React.createContext({
    menuOpen: false,
    toggleMenu: () => { console.log('mobile menu state provider') }
});

MobileMenuContext.displayName = 'MobileMenuContext';

export const MobileMenuProvider = (props: React.PropsWithChildren) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    return (
        <MobileMenuContext.Provider value={{ menuOpen, toggleMenu: () => setMenuOpen(!menuOpen) }}>
            {props.children}
        </MobileMenuContext.Provider>
    )
}

export const useMobileMenu = () => {
    const context = React.useContext(MobileMenuContext);
    if (!context) {
        throw new Error('No MobileMenuProvider found when calling useMobileMenu')
    }
    return context
}
