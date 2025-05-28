import Database from "better-sqlite3";

const db = new Database('./data/database.sqlite')

db.prepare(`CREATE TABLE IF NOT EXISTS blog (id INTEGER PRIMARY KEY AUTOINCREMENT, szerző STRING, cím STRING, kategória STRING, tartalom STRING, kelte DATETIME, módosítva DATETIME)`).run()

export const getAllBlogs = () => db.prepare(`SELECT * FROM blog`).all()
export const createBlog = (szerzo, cim, kategoria, tartalom ) => {const now = new Date().toISOString(); db.prepare(`INSERT INTO blog (szerző,cím,kategória,tartalom,kelte,módosítva) VALUES (?,?,?,?,?,?)`).run(szerzo, cim, kategoria, tartalom, now, now); return result.lastInsertRowid;   }
export const setBlog = (id, szerzo, cim, kategoria, tartalom) => {const now = new Date().toISOString(); db.prepare(`UPDATE blog SET szerző = ?,cím = ?,kategória = ?,tartalom = ?,módosítva = ? WHERE id = ? `).run(szerzo, cim, kategoria, tartalom, now,id)}
export const deleteBlog = (id) => db.prepare(`DELETE FROM blog WHERE id = ?`).run(id)

const blogok = [
    {
      szerző: "Dr. Tóth András",
      cím: "A trauma hosszú távú hatásai",
      kategória: "Traumapszichológia",
      tartalom: "A traumára adott lehetséges pszichés reakciók.",
    },
    {
        szerző: "Dr. Bálint Eszter",
        cím: "A függőség nem akaratgyengeség",
        kategória: "Addiktológia",
      tartalom: "Miért alakulnak ki addikciók.",
    },
    {
        szerző: "Dr. Varga Katalin",
        cím: "Borderline személyiségzavar belülről",
        kategória: "Személyiségzavarok",
      tartalom: "Az érintettek belső világába.",
    }
  ];
  if (getAllBlogs().length === 0) {
    blogok.forEach(blog =>{
      createBlog(blog.szerző, blog.cím, blog.kategória, blog.tartalom)
    })
  }
  